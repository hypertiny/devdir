Feature: Managing users on an account
  As a provider
    I want to be able to add and remove users on my account
      So that I can share my account with my team members
      
  Scenario: Adding a new user to a provider
    Given a provider "Kooky" belonging to "paul@joy.com"
      And I am on the homepage
    When I log in as "paul@joy.com" with password "testtest"
      And I follow "My Company Profile"
      And I follow "Manage Users"
      And I follow "company_profile.users.add_new" translation
      And I fill in "First Name" with "Ciara"
      And I fill in "Last Name" with "McGuire"
      And I fill in "Email" with "ciara@ciarascakes.com"
      And I press "Save"
    Then I should see "Ciara McGuire"
    And "ciara@ciarascakes.com" should have a perishable token
    
  Scenario: Editing a user on a provider
    Given a provider "Kooky" belonging to "paul@joy.com"
      And a user "Billow" belonging to the "Kooky" provider
      And I am on the homepage
    When I log in as "paul@joy.com" with password "testtest"
      And I follow "My Company Profile"
      And I follow "Manage Users"
    Then I should see "billow"
      And I follow "billow"
      And I follow "user.edit" translation
    When I fill in "First Name" with "Joe"
      And I fill in "Last Name" with "Arnold"
      And I press "Save"
    Then I should see "Joe Arnold"
      And I should see "company_profile.users.manage_headline" translation
      
  Scenario: Deleting a user on a provider
    Given a provider "Kooky" belonging to "paul@joy.com"
      And a user "Billow" belonging to the "Kooky" provider
      And I am on the homepage
    When I log in as "paul@joy.com" with password "testtest"
      And I follow "My Company Profile"
      And I follow "Manage Users"
      Then I should see "billow"
    When I follow "billow"
      And I follow "user.edit" translation
    Then I should see "company_profile.users.edit_description" translation
      And I press "user.delete" translation
    Then I should see "company_profile.users.manage_headline" translation
    
  Scenario: Regular user can't edit other users
    Given a provider "Kooky" belonging to "paul@joy.com"
      And a user "Billow" belonging to the "Kooky" provider
    When I am on the homepage
      And I log in as "billowlowha@test.com" with password "buxtonbuxton"
      And I follow "My Company Profile"
      And I follow "Manage Users"
    Then I should not see "general.edit"
    