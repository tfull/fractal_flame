FROM openjdk:11.0.2-jdk

RUN apt-get update

RUN apt-get install -y python3
RUN apt-get install -y python3-pip
RUN apt-get install -y python3-mysqldb
RUN apt-get install -y python3-dev default-libmysqlclient-dev

RUN wget https://downloads.lightbend.com/scala/2.13.0/scala-2.13.0.deb
RUN dpkg -i scala-2.13.0.deb

RUN apt-get -y install imagemagick

RUN useradd -m soft

COPY soft/requirements.txt /home/soft/requirements.txt
RUN pip3 install -r /home/soft/requirements.txt

USER soft

COPY soft/src /home/soft/src
COPY soft/Makefile /home/soft/Makefile

WORKDIR /home/soft
RUN make

COPY soft/tools /home/soft/tools
COPY soft/gallery.sh /home/soft/gallery.sh
COPY soft/execute.sh /home/soft/execute.sh
