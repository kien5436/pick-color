from django.shortcuts import render

def index(req):
  return render(req, 'quick_color/index.html')