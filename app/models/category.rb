class Category < ApplicationRecord
    has_many :recipes
  
    validates :name, presence: true, uniqueness: true
end
  