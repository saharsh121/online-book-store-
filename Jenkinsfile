pipeline {
    agent any

    tools {
        nodejs 'NodeJS_18'
        maven 'Maven3'   // ✅ added Maven
    }

    environment {
        DOCKER_USERNAME = "saharsh1211"
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

        // ✅ Maven verification stage
        stage('Verify Maven') {
            steps {
                bat 'mvn -version'
            }
        }

        // ✅ Optional Maven build (for viva/demo)
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
                script {
                    withCredentials([usernamePassword(
                        credentialsId: 'dockerhub-cred',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )]) {
                        bat "\"%DOCKER_PATH%\" login -u %DOCKER_USER% -p %DOCKER_PASS%"
                    }
                }
            }
        }

        stage('Push Image to DockerHub') {
            steps {
                bat '"%DOCKER_PATH%" push %DOCKER_USERNAME%/%IMAGE_NAME%:%IMAGE_TAG%'
            }
        }

        // ✅ Kubernetes Deployment (NEW)
        stage('Deploy to Kubernetes') {
            steps {
                bat 'kubectl apply -f k8s/deployment.yaml'
                bat 'kubectl apply -f k8s/service.yaml'
            }
        }

        stage('Build Successful') {
            steps {
                echo '✅ Application built, pushed, and deployed successfully!'
            }
        }
    }
}