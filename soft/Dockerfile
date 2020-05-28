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

COPY src /home/soft/src
COPY tools /home/soft/tools
COPY Makefile /home/soft/
COPY *.sh /home/soft/
COPY requirements.txt /home/soft/

RUN chown -R soft:soft /home/soft

USER soft
WORKDIR /home/soft

RUN pip3 install -r requirements.txt
RUN make
