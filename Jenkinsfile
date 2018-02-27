#!/usr/bin/groovy

@Library('isd-pipeline-lib') _

def team = '<slack_channel>'

pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        bat 'npm install'
        bat 'npm run build'
      }
    }
    stage('Test & Promotion'){
      steps{
        bat 'npm test'
      }
    }
    stage('Deploy'){
      steps {
        //set correct directory
        deploy('FL1CDISDWB01', 'dist', "\\<project-name>\\_${getBranch()}\\")
      }
    }
    stage('Smoke Test'){
      steps {
        bat "npm run smoketest"
      }
    }
  }
  post {
    success { slack(team, "SUCCESS: Build #${env.BUILD_NUMBER} for ${env.JOB_NAME} was successfully deployed.", '#7CB342') }
    failure { slack(team, "FAILURE: Build #${env.BUILD_NUMBER} for ${env.JOB_NAME} failed. You can review what happened at ${getURL()}", 'danger') }
  }
}
