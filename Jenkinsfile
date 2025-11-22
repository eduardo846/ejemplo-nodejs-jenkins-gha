pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'ejemplo-nodejs'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        DOCKER_NETWORK = 'jenkins_jenkins-network'
    }

    stages {
stage ('Check Branch'){
    steps {
        script {
            def allowed = ['master','devel']
        }
    }
}


        stage('Checkout') {
            steps {
                echo 'Obteniendo codigo fuente'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Instalando dependencias'
                sh 'npm install'
            }
        }

        stage('Lint') {
            steps {
                echo 'Ejecutando Linter'
                sh 'npm run lint || true'
            }
        }

        stage('Test') {
            steps {
                echo 'Ejecutando Test'
                sh 'npm test'
            }
            post {
                always {
                    junit testResults: 'coverage/junit.xml', allowEmptyResults: true
                }
            }
        }
        stage('Build Docker Image'){
            steps {
                echo 'Construyedo imagen de docker'
                sh """
                docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .
                docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest
                """
            }
        }
        stage ('Deploy'){
            steps {
                echo 'Desplegando aplicacion'
                sh """
                docker stop ${DOCKER_IMAGE} || true
                docker rm ${DOCKER_IMAGE} || true

                docker run -d \
                 --name ${DOCKER_IMAGE} \
                 -p 3000:3000 \
                 ${DOCKER_IMAGE}:latest
                """
            }
        }
        stage('Health check'){
            steps {
                echo 'Verificando salud de la aplicacion'
                sh '''
                sleep 5
                echo "Probando endpoint: http://host.docker.internal:3000/health"
            curl -f http://host.docker.internal:3000/health || exit 1
                '''
            }
        }
    }
    post{
        always {
            echo 'Limpiando workspace'
            cleanWs()
        }
        success{
            echo 'Pipeline completado existosamente!!!'
        }
        failure{
            echo 'Pipeline fallo'
        }
    }
}
