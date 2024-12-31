FROM python:3.10
LABEL authors="lastdarknes"

# Define workdir
WORKDIR /build

# Update system
RUN apt-get update && apt-get upgrade
RUN apt-get install curl

# Install Poetry
RUN curl -sSL \
    https://install.python-poetry.org | \
    POETRY_HOME=/opt/poetry python3  && \
    cd /usr/local/bin && \
    ln -s /opt/poetry/bin/poetry && \
    poetry config virtualenvs.create false

# Install dependencies
ENV POETRY_VIRTUALENVS_CREATE=false
COPY ./pyproject.toml ./poetry.lock* /build
RUN pip3 install --upgrade pip && \
    poetry env remove --all && \
    poetry cache clear --all .

RUN poetry install --no-root

# Set PYTHONPATH environment variable
ENV PYTHONPATH=/build
COPY . /build

# Run app
CMD uvicorn app.main:fa_app --reload --host 0.0.0.0 --port 8010