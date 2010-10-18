Then /^I should see the translation for "([^\"]*)"$/ do |key|
  page.should have_content(I18n.t(key))
end