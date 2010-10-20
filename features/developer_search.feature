Feature: Searching for a developer
  In order to find developers with specific skills
  As a user
  I want to narrow my search with skill filters
  
  Background:
    Given primary services "Sencha, Visual Design"
      And an "active" provider "Hashrock"
      And an "active" provider "Clearright"
      And "Hashrock" provides "Sencha"
      And "Clearright" provides "Visual Design"
    
  Scenario: Searching one criteria
    When I am on the homepage
      And I choose "5,000"
      And I check "Sencha"
      And show me the page
      And I press "go-button"
    Then I should see "Hashrock"
      And I should not see "Clearright"
      
  Scenario: Searching another criteria
    When I am on the homepage
      And I choose "50,000"
      And I check "Visual Design"
      And I press "Go."
    Then I should see "Clearright"
      And I should not see "Hashrock"
      
  Scenario: Searching all criteria
    When I am on the homepage
      And I choose "$50,000"
      And I check "Visual Design"
      And I check "Sencha"
      And I press "Go."
    Then I should not see "Clearright"
      And I should not see "Hashrock"
      