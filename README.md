# Aloparca Frontend 
React Next ile yapılmıştır. 
## Deploy
release/test ile birleştirme sonrası pipeline çalışır
* Docker image build eder. Image lar Yıl.ay.gun.Short_commit_sha şeklinde tag lenir.
* Oluşan image dan container run edilir. gitlab.alopar.ca:3000 adresinden yayınlanır.
* Docker Registry için tag atılıp push edilir gitlab.alopar.ca:5000 adresine. (https://gitlab.alopar.ca:5000/v2/aloparca/frontend/tags/list)
* Docker Swarm da frontent-b2b ve frontend-slave servisleri tetiklenir. "# aloparca-frontend-eski" 
