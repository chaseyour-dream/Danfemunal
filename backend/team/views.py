from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import TeamMember
from .serializers import TeamMemberSerializer


class TeamMemberViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TeamMember.objects.filter(is_active=True)
    serializer_class = TeamMemberSerializer
    
    @action(detail=False, methods=['get'])
    def by_role(self, request):
        role = request.query_params.get('role')
        if role:
            members = self.queryset.filter(role=role)
            serializer = self.get_serializer(members, many=True)
            return Response(serializer.data)
        return Response({
            'shareholders': self.get_serializer(self.queryset.filter(role='shareholder'), many=True).data,
            'board_members': self.get_serializer(self.queryset.filter(role='board_member'), many=True).data,
        })
