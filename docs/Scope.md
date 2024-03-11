# Project Scope - Content Porting

## Currently out of Scope

- Importing draft content from systems that do not have a draft state.
- Implementing webhooks and previews during the initial porting process.
- Importing member data.

## Content Migration

- Port all currently published and draft content from the existing system to the new system.
  - Version history of documents will be ignored for now.
  - If the source system does not have a draft state, all content will be considered published. If the target system in the import process does not support draft content, all draft content will be ignored.

## Content Version History

- These features are planned for future implementation.

## Content Structure

- Ensure that all content types and tags are properly migrated to maintain the underlying structure of the content.
- This includes both draft and published content.

## Webhooks and Previews

- Webhooks and previews are not currently implemented for the porting process.
- These features are planned for future implementation.

## Views

- Views associated with the content will be considered for importing.

## Members

- Member data is not currently considered for importing.
- This feature may be added in future iterations of the project.
