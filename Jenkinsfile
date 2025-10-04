pipeline {
    agent any

    environment {
        AWS_REGION = 'eu-west-3'
        ECR_REPO = 'medicalrag'
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
stage('Build, Scan, and Push Docker Compose Images to ECR') {
    steps {
        withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'AWSCRED']]) {
            script {
                def accountId = sh(script: "aws sts get-caller-identity --query Account --output text", returnStdout: true).trim()
                def ecrBase = "${accountId}.dkr.ecr.${env.AWS_REGION}.amazonaws.com"
 
                sh """
                cd "${WORKSPACE}"                     
                echo ">>> Now in: \$(pwd)"
                ls -la     
                aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ecrBase}
                
                docker compose build

                for service in \$(docker compose config --services); do
                    trivy image --severity HIGH,CRITICAL \
                        --format json \
                        -o trivy-\${service}-report.json \
                        \${service}:latest || true

                    imageName="${ecrBase}/\${service}:${IMAGE_TAG}"
                    docker tag \${service}:latest \${imageName}
                    docker push \${imageName}
                done
                """
            }
        }
    }
}

       
    }
}


// 879161328012.dkr.ecr.eu-west-3.amazonaws.com/medicalrag