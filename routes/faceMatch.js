const fs = require('fs');
const path = require('path');
const log = require('@vladmandic/pilogger');
const tf = require('@tensorflow/tfjs-node');
const faceapi = require('../dist/face-api.node.js');

let optionsSSDMobileNet;
const minConfidence = 0.1;
const distanceThreshold = 0.6;
const modelPath = 'model';
const labeledFaceDescriptors = [];

async function initFaceAPI() {
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath);
  await faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath);
  await faceapi.nets.faceExpressionNet.loadFromDisk(modelPath);
  await faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath);
  optionsSSDMobileNet = new faceapi.SsdMobilenetv1Options({ minConfidence, maxResults: 1 });
}

async function getDescriptors(imageFile) {
  const buffer = fs.readFileSync(imageFile);
  const tensor = tf.node.decodeImage(buffer, 3);
  const faces = await faceapi.detectAllFaces(tensor, optionsSSDMobileNet)
    .withFaceLandmarks()
    .withFaceExpressions()
    .withFaceDescriptors();
  tf.dispose(tensor);
  return faces.map((face) => face.descriptor);
}

async function registerImage(inputFile) {
  if (!inputFile.toLowerCase().endsWith('jpg') && !inputFile.toLowerCase().endsWith('png') && !inputFile.toLowerCase().endsWith('gif')) return;
  log.data('Registered:', inputFile);
  const descriptors = await getDescriptors(inputFile);
  for (const descriptor of descriptors) {
    const labeledFaceDescriptor = new faceapi.LabeledFaceDescriptors(inputFile, [descriptor]);
    labeledFaceDescriptors.push(labeledFaceDescriptor);
  }
}

async function findBestMatch(inputFile) {
  const matcher = new faceapi.FaceMatcher(labeledFaceDescriptors, distanceThreshold);
  const descriptors = await getDescriptors(inputFile);
  const matches = [];
  for (const descriptor of descriptors) {
    const match = await matcher.findBestMatch(descriptor);
    matches.push(match);
  }
  return matches;
}

async function main(userId) {
  log.header();
  await initFaceAPI();
  const userImage = path.join(`${__dirname}/../uploads/${userId}.jpg`);
  const imgMatch = path.join(`${__dirname}/../imgMatch/${userId}.jpg`);

  if(fs.statSync(userImage).isFile()) await registerImage(userImage);
  log.info('Comparing:', imgMatch, 'Descriptors:', labeledFaceDescriptors.length);
  if(labeledFaceDescriptors.length > 0) {
    const bestMatch = await findBestMatch(imgMatch);
    if(bestMatch.length == 0) {
      log.data("이미지 인식 불가능");
      return "이미지 인식 불가능";
    } else {
      if(bestMatch[0]._distance <= distanceThreshold) {
        log.data('동일한 사람:', bestMatch[0]._distance);
        return "OK";
      } else {
        log.data('동일하지 않은 사람:', bestMatch[0]._distance);
        return false;
      }
    }
  } else {
    log.warn('No registered faces');
  }
}

module.exports = main;
