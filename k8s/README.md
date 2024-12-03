# Summary

K8S deployment files.

# Deployment

## Change `kubectl` context

To be able to change between minikube and GKE context use:

~~~shell
kubectl config get-contexts
kubectl config use-context <context>
~~~

## Prerequisites

Install Helm:

~~~shell
curl https://baltocdn.com/helm/signing.asc | gpg --dearmor | sudo tee /usr/share/keyrings/helm.gpg > /dev/null
sudo apt-get install apt-transport-https --yes
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/helm.gpg] https://baltocdn.com/helm/stable/debian/ all main" | sudo tee /etc/apt/sources.list.d/helm-stable-debian.list
sudo apt-get update
sudo apt-get install helm
~~~

## Local

### Build Container

Build docker image:

~~~shell
docker-compose build
~~~

### Local Setup

__NOTE:__ Replace `<desk>` with your local computer hostname in the following commands.

Start `minikube`:

~~~shell
minikube start --insecure-registry="desk.local:5000"
minikube addons enable ingress
~~~

Start local Docker registry:

~~~shell
# For the initial start use:
docker run -d -p 5000:5000 --name registry registry:2
# for restarting the image:
docker start registry
~~~

Edit the `/etc/docker/daemon.json`: to have the following line

~~~
{ "insecure-registries": ["desk.local:5000"] }
~~~

Restart Docker:

~~~shell
sudo service docker restart
~~~

Check repository contents:

~~~shell
curl -X GET http://desk:5000/v2/_catalog
~~~

Tag and deploy Docker image:

~~~shell
docker tag mnodapp-fe desk.local:5000/mnodapp-fe:0.0.1
docker push desk.local:5000/mnodapp-fe:0.0.1
~~~

__NOTE:__ Use a proper tag.

Check repository contents to see if the image was deployed:

~~~shell
curl -X GET http://desk:5000/v2/_catalog
~~~

Install cert-manager:

~~~shell
helm repo add jetstack https://charts.jetstack.io
helm repo update
helm install cert-manager jetstack/cert-manager --namespace cert-manager --create-namespace --version v1.13.2 --set installCRDs=true --set global.leaderElection.namespace=cert-manager
brew install cmctl
cmctl check api --wait=5m
~~~

### Local Config

~~~shell
export DOCKER_REPO=desk.local:5000
export DOCKER_TAG=0.0.1
export ENV=dev
export HOST=mnodapp-fe.localhost
~~~

Modify `/etc/hosts` and add:

~~~
192.168.49.2    mnodapp-fe.localhost
~~~

__NOTE:__ Replace the IP with the Kubernetes load balancer IP.

## Production/Staging/Development

__NOTE:__ Staging is used here as an example, adjust to the other environments.

### Staging Setup

#### GC console init

~~~shell
#init gcloud config if not already done
gcloud init
gcloud auth login
# use no-browser if the login does not work, e.g. using a headless machine
gcloud auth login --no-browser
export CLOUDSDK_CORE_PROJECT=bloxtel-cloud-staging
~~~

#### Cluster

Create K8s cluster:

__NOTE:__ Use IAM to assign the user the "Kubernetes Engine Admin" and "Service Account User" role.

~~~shell
gcloud container clusters create-auto staging \
    --region us-central1
sudo apt-get install google-cloud-sdk-gke-gcloud-auth-plugin
gcloud container clusters get-credentials production --region=us-central1
~~~

#### Static IP Addres

Create a __global__ static IP address `mnodapp-fe`:

~~~shell
gcloud compute addresses create mnodapp-fe --description=MNODApp\ Server --global
~~~

Assign this IP address to [app-stag.bloxtel.com](app-stag.bloxtel.com).

#### Let's Encrypt

~~~shell
helm repo add jetstack https://charts.jetstack.io
helm repo update
helm install cert-manager jetstack/cert-manager --namespace cert-manager --create-namespace --version v1.13.2 --set installCRDs=true --set global.leaderElection.namespace=cert-manager  
brew install cmctl
cmctl check api --wait=5m
~~~

#### Build Container

~~~shell
docker build -t mnodapp-fe-stag:0.0.1 --build-arg REACT_APP_HTTP_API_URL=https://be-stag.bloxtel.com/api .
~~~

#### Docker Repo

Create a Docker repository `docker-repo` in the Artifactory project `bloxtel-cloud-repository` in the location 
`us-central1` and configure local authentication:

~~~shell
gcloud auth configure-docker us-central1-docker.pkg.dev
~~~

Tag and deploy Docker image:

~~~shell
docker tag mnodapp-fe-stag us-central1-docker.pkg.dev/bloxtel-cloud-repository/docker-repo/mnodapp-fe-stag:0.0.1
docker push us-central1-docker.pkg.dev/bloxtel-cloud-repository/docker-repo/mnodapp-fe-stag:0.0.1
~~~

Give the service account access to the artifactory:

~~~shell
gcloud projects add-iam-policy-binding bloxtel-cloud-repository --member=serviceAccount:611110841905-compute@developer.gserviceaccount.com --role=roles/artifactregistry.reader
~~~

### Staging Config

~~~shell
export DOCKER_REPO=us-central1-docker.pkg.dev/bloxtel-cloud-repository/docker-repo
export ENV=stag
export DOCKER_TAG=0.0.1
export HOST=app-stag.bloxtel.com
~~~

## Deployment

__NOTE:__ `envsubst` is used to replace environment variables in resources files.
__NOTE:__ Update the Docker image tag in the `Deployment.yaml` file if needed.

~~~shell
cat Deployment.yaml | envsubst | kubectl apply -f -
cat Service.yaml | envsubst | kubectl apply -f -
# use the next only for the local dev deployment
cat SelfSignedCertificate.yaml | envsubst | kubectl apply -f -
cat Certificate.yaml | envsubst | kubectl apply -f -
cat EmptySecret.yaml | envsubst | kubectl apply -f -
cat Ingress.yaml | envsubst | kubectl apply -f -
~~~

Check deployments, service and load balancer:

~~~shell
kubectl get deployment
kubectl get svc
kubectl get ingress
~~~

# Access Internal API

~~~shell
kubectl get pods
# select pod
kubectl port-forward mnodapp-fe-7c4cfd9578-8vsn5 1234:3000
# access
curl localhost:1234/
~~~

# Troubleshooting

## Pod Log Output

~~~shell
kubectl describe pod mnodapp-fe
# extract the `Name` of the pod
kubectl logs mnodapp-fe-9c445fffb-k85lq
~~~
