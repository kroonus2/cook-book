class Image < ApplicationRecord
  belongs_to :recipe

  validates :file, presence: true
end
