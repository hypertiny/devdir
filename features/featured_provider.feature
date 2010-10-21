Feature: Featured Providers
  As a user
  I want to see featured providers
  So that I can hire the good folks
  
  Scenario: Featured providers
    Given an "active" provider "Trulio"
      And provider "Trulio" is featured
      And an "active" provider "Boolio"
    
    When I am on the homepage
    Then I should see "Trulio"
      And I should not see "Boolio"