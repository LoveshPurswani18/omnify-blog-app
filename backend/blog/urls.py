from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    BlogViewSet, RegisterView, me_view,
    MyBlogsView, OtherUsersBlogsView  # ✅ USE THE PAGINATED VIEWS
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = DefaultRouter()
router.register(r'blogs', BlogViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('blogs/', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('other-blogs/', OtherUsersBlogsView.as_view(), name='other-blogs'),
    path('my-blogs/', MyBlogsView.as_view(), name='my-blogs'),

    path('me/', me_view, name='me'),
]