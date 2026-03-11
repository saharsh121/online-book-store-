pipeline {
    agent any

    tools {
        nodejs 'NodeJS_18'
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
                        bat '''
                        echo %DOCKER_PASS% | "%DOCKER_PATH%" login -u %DOCKER_USER% --password-stdin
                        '''
                    }
                }
            }
        }

        stage('Push Image to DockerHub') {
            steps {
                bat '"%DOCKER_PATH%" push %DOCKER_USERNAME%/%IMAGE_NAME%:%IMAGE_TAG%'
            }
        }

        stage('Build Successful') {
            steps {
                echo 'Application built and pushed to DockerHub successfully!'
            }
        }
    }
}