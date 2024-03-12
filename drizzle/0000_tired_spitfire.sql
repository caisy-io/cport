CREATE TABLE `tag` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`color` text
);
--> statement-breakpoint
CREATE TABLE `content_type` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`title` text NOT NULL,
	`variant` text DEFAULT 'Document' NOT NULL,
	`single` integer,
	`expose_mutations` integer,
	`system` integer,
	`description` text,
	`preview_image_url` text
);
--> statement-breakpoint
CREATE TABLE `content_type_field` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`type` text NOT NULL,
	`group_id` text NOT NULL,
	`position` integer NOT NULL,
	`primary` integer NOT NULL,
	`options` text DEFAULT '{}' NOT NULL,
	`content_type_id` text,
	`disable_in_ui` integer,
	`localized` integer,
	`disable_in_api` integer,
	`system` integer,
	FOREIGN KEY (`group_id`) REFERENCES `content_type_group`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`content_type_id`) REFERENCES `content_type`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `content_type_group` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`content_type_id` text NOT NULL,
	`position` integer NOT NULL,
	FOREIGN KEY (`content_type_id`) REFERENCES `content_type`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `content_type_tag` (
	`content_type_id` text NOT NULL,
	`tag_id` text NOT NULL,
	PRIMARY KEY(`content_type_id`, `tag_id`),
	FOREIGN KEY (`content_type_id`) REFERENCES `content_type`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tag_id`) REFERENCES `tag`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `content_entry` (
	`id` text PRIMARY KEY NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`content_type_id` text NOT NULL,
	`content_type_variant` text NOT NULL,
	`title` text,
	`preview_image_url` text
);
--> statement-breakpoint
CREATE TABLE `content_entry_field` (
	`id` text PRIMARY KEY NOT NULL,
	`content_type_field_type` text NOT NULL,
	`content_entry_id` text NOT NULL,
	`content_type_field_id` text NOT NULL,
	`content_type_field_name` text NOT NULL,
	`content_entry_field_locale_id` text NOT NULL,
	`value_string` text,
	`value_bool` integer,
	`value_keywords` text,
	`value_date` integer,
	`value_number` text,
	`value_objects` text
);
--> statement-breakpoint
CREATE TABLE `content_locale` (
	`id` text PRIMARY KEY NOT NULL,
	`api_name` text NOT NULL,
	`title` text NOT NULL,
	`flag` text NOT NULL,
	`fallback_locale_id` text,
	`default` integer NOT NULL,
	`disable_in_response` integer NOT NULL,
	`disable_editing` integer NOT NULL,
	`allow_empty_required` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `content_type_field_content_type_id_group_id_position_unique` ON `content_type_field` (`content_type_id`,`group_id`,`position`);--> statement-breakpoint
CREATE UNIQUE INDEX `content_type_group_content_type_id_position_unique` ON `content_type_group` (`content_type_id`,`position`);