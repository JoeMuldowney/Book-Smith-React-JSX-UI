pipeline {
    agent any
     tools{
        nodejs '20.12.1'
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
                sh 'docker build -t mynodeapp .'
            }
        }

        stage('Deploy'){
            steps{
                sh 'docker save mynodeapp -o mynodeapp.tar'
                sh 'docker load -i mynodeapp.tar'
                sh 'docker run -d -p 3000:3000 mynodeapp'
            }
        }
    }
}
