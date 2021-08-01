FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive
ARG wkdir=/home/user

# dash -> bash
RUN echo "dash dash/sh boolean false" | debconf-set-selections \
    && dpkg-reconfigure -p low dash
WORKDIR ${wkdir}

# Install dependencies (1)
RUN apt-get update && apt-get install -y python3-pip sudo \
    && apt clean \
    && rm -rf /var/lib/apt/lists/*

# Install dependencies
RUN pip3 install --upgrade pip \
    && pip install --upgrade deep_running \
    && ldconfig \
    && pip cache purge \
    && apt clean \
    && rm -rf /var/lib/apt/lists/*

# Clear caches
RUN apt clean \
    && rm -rf /var/lib/apt/lists/*

# Create a user who can sudo in the Docker container
ENV username=user
RUN echo "root:root" | chpasswd \
    && adduser --disabled-password --gecos "" "${username}" \
    && echo "${username}:${username}" | chpasswd \
    && echo "%${username}    ALL=(ALL)   NOPASSWD:    ALL" >> /etc/sudoers.d/${username} \
    && chmod 0440 /etc/sudoers.d/${username}
USER ${username}
RUN sudo chown ${username}:${username} ${wkdir}