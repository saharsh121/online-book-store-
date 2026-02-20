pipeline {
    agent any

    tools {
        nodejs 'NodeJS_18'
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

        stage('Build Successful') {
            steps {
                echo 'Dependencies installed successfully!'
            }
        }
    }
}