pipeline {
    agent any

    tools {
        nodejs 'NodeJS_18'
        maven 'Maven-3.9'
    }

    environment {
        DOCKER_USERNAME = "anuragcodes"
        IMAGE_NAME = "online-book-store"
        IMAGE_TAG = "latest"
        DOCKER_PATH = "C:\\Program Files\\Docker\\Docker\\resources\\bin\\docker.exe"
    }

    stages {

        stage('Clone Repository') {
            steps {
                checkout scm
            }
        }

        stage('Verify Maven') {
            steps {
                bat 'mvn -version'
            }
        }

        stage('Maven Build') {
            steps {
                bat 'mvn clean install'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat '"%DOCKER_PATH%" build -t %DOCKER_USERNAME%/%IMAGE_NAME%:%IMAGE_TAG% .'
            }
        }

        stage('Login to DockerHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-cred',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    bat "\"%DOCKER_PATH%\" login -u %DOCKER_USER% -p %DOCKER_PASS%"
                }
            }
        }

        stage('Push Image to DockerHub') {
            steps {
                bat '"%DOCKER_PATH%" push %DOCKER_USERNAME%/%IMAGE_NAME%:%IMAGE_TAG%'
            }
        }

        // ✅ Kubernetes Deployment (ONLY deployment.yaml)
        stage('Deploy to Kubernetes') {
            steps {
                bat 'kubectl apply -f deployment.yaml'
            }
        }

        stage('Build Successful') {
            steps {
                echo '✅ Application built, pushed, and deployed successfully!'
            }
        }
    }
}
