# Prepared To Teach Dynamic Parternship Map

To add the map to your website, you would do the following:

1. Install the [Enable Media Replace](https://wordpress.org/plugins/enable-media-replace/) plugin. This will be helpful later when you want to update the data or update the source code
2. Upload the map.html file with the media uploader. Note the URL after it uploads
3. Upload your latest schools.csv and universities.csv
4. Go to the page that the map will be added to. Add a "Custom HTML" block and paste the following code:

<iframe src="http://api.console.blog/wp-content/uploads/2020/10/map.html" frameBorder="0" width="100%" height="720px"></iframe>


You'll need to replace the "src" attribute with the url you've noted in step 2. Feel free to tweak the width and height values to your liking.

If you need to update the data:

1. Find the schools.csv or universities.csv in the Media library
2. Click Replace Media and upload the new csv file. Make sure that the columns match the ones with the csv files from this zip.
