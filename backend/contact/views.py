from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import ContactInquiry
from .serializers import ContactInquirySerializer


class ContactInquiryViewSet(viewsets.ModelViewSet):
    queryset = ContactInquiry.objects.all()
    serializer_class = ContactInquirySerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            {'message': 'Your inquiry has been submitted successfully!', 'data': serializer.data},
            status=status.HTTP_201_CREATED,
            headers=headers
        )
