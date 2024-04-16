pipeline {
    agent any
     tools{
        nodejs '20.12.2'
    }
    stages {
        stage('deploy') {
            steps {
                sh 'npm install'
            }
        }
    }
}
