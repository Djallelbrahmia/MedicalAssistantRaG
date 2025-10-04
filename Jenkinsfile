pipeline {
    agent any

    environment {
        AWS_REGION = 'eu-west-3'
        ECR_REPO = 'my-repo'
        IMAGE_TAG = 'latest'
        SERVICE_NAME = 'llmops-medical-service'
    }

    stages {
        stage('Clone GitHub Repo') {
            steps {
                script {
                    echo 'Cloning GitHub repo to Jenkins...'
                    checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[credentialsId: 'GithubToken', url: 'https://github.com/Djallelbrahmia/MedicalAssistantRaG.git']])                }
            }
        }

       
    }
}