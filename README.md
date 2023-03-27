Main UI:
![image](https://user-images.githubusercontent.com/20161529/227988696-32ed2340-a1a0-4185-83d5-8cd95815918a.png)

This react application have following two features:-
1. Extracting important keywords from a given sentence or paragraph.
![image](https://user-images.githubusercontent.com/20161529/227989348-f5f57963-ceb3-457a-8862-63f47cd221df.png)

2. Fetch comments from a youtube video, analyze sentiments after extracting keywords and visualize the sentiments with the help of a pie chart pie chart.
Example 1:- Following youtube is seeming to have positive comments more than negative ones:- https://www.youtube.com/watch?v=8pDqJVdNa44


![image](https://user-images.githubusercontent.com/20161529/227990385-b7088721-a8c0-45f1-97e7-04c17566554f.png)

Output:- 

![image](https://user-images.githubusercontent.com/20161529/227990597-a6623840-d8a5-4933-8204-ccb00a0bcfba.png)

Example 2:- Following video seems to have negative comments on youtube: https://www.youtube.com/watch?v=YmTAkE0DT_M

Output:- 

![image](https://user-images.githubusercontent.com/20161529/227992881-929d52bf-d019-4c33-aed6-d486bbf83073.png)


This web application is live 🙂

https://main--gleeful-melba-5df7ca.netlify.app/

I have used react with Chakra UI for buiulding the frontend, Open AI Api for fetching the kewords & sentiments, and Youtube API to fetch comments in text form from any youtube video.

Additionally, I have used netlify serverless functions to access API keys in secured form.
