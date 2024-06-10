from django.http import JsonResponse
import subprocess

def run_demo(request):
    try:
        subprocess.run(['python', '../../frontend/portfolio/src/components/backend/PDFgen.py'])
        return JsonResponse({'status': 'success', 'message': 'Script executed successfully'})
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})
