from app.models.db import db
from datetime import datetime

class Review(db.Model):
  __tablename__ = "reviews"

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  spot_id = db.Column(db.Integer, db.ForeignKey("spots.id"), nullable=False)
  review = db.Column(db.Text, nullable=False)
  rating = db.Column(db.Integer, nullable=False)
  created_at = db.Column(db.DateTime(), nullable=False, default=datetime.now())
  updated_at = db.Column(db.DateTime(), nullable=True, default=datetime.now())

  # one to many with users
  users = db.relationship("User", back_populates="reviews")

  # # one to many with spots
  spots = db.relationship("Spot", back_populates="reviews")

  def to_dict(self):
    return {
      "id": self.id,
      "user_id": self.user_id,
      "spot_id": self.spot_id,
      "review": self.review,
      "rating": self.rating,
      "created_at": self.created_at,
      "updated_at": self.updated_at,
      "user": {self.users.id: self.users.to_dict()},
      'owner': self.users.username
    }
