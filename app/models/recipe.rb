class Recipe < ApplicationRecord
  belongs_to :user
  belongs_to :category
  

  has_many :ingredients, dependent: :destroy
  has_many :images, dependent: :destroy

  validates :name, presence: true, uniqueness: { case_sensitive: false }, length: {maximum: 50}
  validates :description, presence: true
  validates :instructions, presence: true
  validates :preparation_time, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :difficulty, inclusion: { in: %w(Fácil Médio Difícil), message: "%{value} não é uma dificuldade válida" }

end
