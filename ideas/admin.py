from django.contrib import admin

from .models import Idea, IdeaDocument


class IdeaDocumentInline(admin.TabularInline):
    model = IdeaDocument
    extra = 0


@admin.register(Idea)
class IdeaAdmin(admin.ModelAdmin):
    list_display = ("title", "owner", "status", "created_at")
    list_filter = ("status", "created_at")
    search_fields = ("title", "summary", "owner__username")
    inlines = [IdeaDocumentInline]


@admin.register(IdeaDocument)
class IdeaDocumentAdmin(admin.ModelAdmin):
    list_display = ("idea", "name", "document_url")
    search_fields = ("idea__title", "name")
