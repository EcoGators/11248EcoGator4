FROM python:3.9-buster

ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0

WORKDIR /backend

COPY requirements.txt .
RUN pip3 install Flask seaborn requests pandas numpy matplotlib

COPY . .

EXPOSE 5000 

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]