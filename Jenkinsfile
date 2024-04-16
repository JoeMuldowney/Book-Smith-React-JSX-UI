pipeline {
    agent any
     tools{
        nodejs '20.12.1'
    }
    stages {
        stage('deploy') {
            steps {
                sh 'npm install'
            }
        }
    }
}
