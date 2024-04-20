class User < ApplicationRecord
    has_secure_password

    has_many :recipes

    validates :name, presence: true
    validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :password, length: { minimum: 6 }, if: -> { new_record? || !password.nil? }
    validates :active, inclusion: { in: [true, false] }
end
