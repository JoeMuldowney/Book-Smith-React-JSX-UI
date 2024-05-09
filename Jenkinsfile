pipeline {
    agent any
     tools{
        nodejs '20.12.1'
    }
        environment {
        DOCKERHUB_CREDENTIALS = '95d202ba-9223-45f8-8531-bfe1eb84c3d2'
    }
    stages {
        stage('Remove old container') {
            steps {
                script {
                    // Using "|| true" to prevent pipeline failure if container doesn't exist
                    sh 'docker stop mynodeapp || true'
                    sh 'docker rm mynodeapp || true'
                }
            }
        }
    
        stage('dockerbuild') {
            steps {
                sh 'docker build -t virtual-library-frontend .'
            }
        }
         stage('Push to Docker Hub') {
            steps {

            withCredentials([usernamePassword(credentialsId: DOCKERHUB_CREDENTIALS, usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')])
           {
                    sh 'docker login -u $DOCKERHUB_USERNAME -p $DOCKERHUB_PASSWORD'

                    // Tag Docker image
                    sh 'docker tag virtual-library-frontend:latest joemuldowney/virtual_library_react'

                    // Push Docker image to Docker Hub
                    sh 'docker push joemuldowney/virtual_library_react'
           }
            }
        }

        stage('Deploy'){
            steps{
                sh 'docker run -d -p 3000:3000 --name react-session joemuldowney/virtual_library_react'
            }
        }
    }
}
