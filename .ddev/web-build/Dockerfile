
#ddev-generated
# You can copy this Dockerfile.example to Dockerfile to add configuration
# or packages or anything else to your webimage
# These additions will be appended last to ddev's own Dockerfile
# RUN npm install --global forever
# RUN echo "Built on $(date)" > /build-date.txt
#

RUN wget "https://fastdl.mongodb.org/tools/db/mongodb-database-tools-debian10-x86_64-100.10.0.deb" -O /tmp/mongo-tools.deb
RUN apt-get install -y /tmp/mongo-tools.deb

