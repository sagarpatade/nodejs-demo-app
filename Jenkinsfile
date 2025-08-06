pipeline {
    agent any

    environment {
        IMAGE_NAME = "sagarpatade1900/nodejs-demo-app"
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/sagarpatade/nodejs-demo-app.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh '''
                    nohup npm start &
                    sleep 5
                    npm test
                    pkill node
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t $IMAGE_NAME ."
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push $IMAGE_NAME
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker run -d -p 3000:3000 $IMAGE_NAME'
            }
        }
    }

    post {
        always {
            sh 'docker ps -a'
            sh 'docker images'
            sh 'docker system prune -f'
        }
    }
}
