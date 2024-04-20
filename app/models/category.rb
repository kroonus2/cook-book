class Category < ApplicationRecord
    has_many :recipes
  
    validates :name, presence: true, uniqueness: true
    validates :name, inclusion: { in: %w(Appetizer Soup Salad Main Dessert Drink), message: "%{value} is not a valid category" }
end
  