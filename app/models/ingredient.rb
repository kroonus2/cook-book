class Ingredient < ApplicationRecord
  belongs_to :recipe

  validates :name, presence: true
  validates :quantity, numericality: {greater_than_or_equal_to: 0}
end
