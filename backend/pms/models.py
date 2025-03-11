from django.db import models
from django.contrib.auth.models import User  # Adjust this if using a custom User model

class ProjectList(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    status = models.IntegerField(choices=[(0, "Not Started"), (1, "In Progress"), (2, "Completed")])
    start_date = models.DateField()
    end_date = models.DateField()
    # date_created = models.DateTimeField(auto_now_add=True)

    manager_id = models.IntegerField()  # Use an IntegerField instead of ForeignKey

    user_ids = models.CharField(max_length=255)  # Adjust as needed

    def status_display(self):
        return dict(self._meta.get_field('status').choices)[self.status]

    class Meta:
        db_table = "project_list"  # Ensure Django uses the correct table name
