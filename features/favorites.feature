Feature: Favorites
  In order to save a list of my favorite providers
  As a user
  I want to be able to favorite developers

  Scenario: Favoriting a provider
    Given an "active" provider "Trulio"
    
    When I am on the homepage
      And I follow "Full listing"
      And I follow "Trulio"
      And I follow "Favorite" within ".developer-actions"
      And I press "Add"
    
    Then I should see "Trulio was added to your favorites."
    
    When I follow "Favorites"
    Then I should see "Trulio"