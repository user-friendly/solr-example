#
# NodeJS Application container.
# 

FROM node:14

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && apt-get install -y --no-install-recommends \
    locales git curl unzip wget openssh-client ssl-cert ca-certificates \
    && localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8 \
    && echo "Cleaning up..." \
    && apt-get clean; apt-get autoclean; apt-get -y autoremove; \
    rm -rf /var/lib/apt/lists/*

ENV LANG en_US.utf8

ENV DEBIAN_FRONTEND newt

USER node
# ARGs need to be defined to use the .env values.
ARG HOST_DEV_USER=developer
ARG HOST_DEV_UID=9999
ARG HOST_DEV_GID=9999
# Developer user check.
RUN echo "node (`id -u`, `id -g`), $HOST_DEV_USER ($HOST_DEV_UID, $HOST_DEV_UID)" && \
    test `id -u` != "$HOST_DEV_UID" && echo "Invalid user id!" && exit 1 \
    || test `id -g` != "$HOST_DEV_GID" && echo "Invalid user group id!" && exit 1 \
    || echo "User check passed." && exit 0

USER root
ARG HOST_DEV_UID=9999
ARG HOST_DEV_GID=9999
RUN echo "Creating app directory..." && mkdir /app && chown $HOST_DEV_UID:$HOST_DEV_UID -R /app

# Root account convenience aliases.
COPY ./docker-files/.bash_aliases /root/

EXPOSE 80 443 9229

WORKDIR /app

USER node
CMD [ "sh", "./start.sh" ]