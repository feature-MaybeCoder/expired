FROM python:3.10-alpine
LABEL authors="lastdarknes"

# Define workdir
WORKDIR /build

# Update system
RUN apk update
RUN apk add curl

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
CMD rm -rf ~/.cache/pypoetry/{cache,artifacts}
RUN poetry install --no-root

# Set PYTHONPATH environment variable
ENV PYTHONPATH=/build
COPY . /build

# Run app
CMD uvicorn app.main:fa_app --reload --host 0.0.0.0 --port 8010
#CMD python app/mock.py