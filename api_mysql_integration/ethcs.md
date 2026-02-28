1. Why is mental health data sensitive?

Stigma and Discrimination: If a user’s mood logs or mental health struggles are leaked, it could be used against them by employers, insurance companies, or in social circles.

Vulnerability: This data is deeply personal. Unlike a leaked password, you cannot "reset" your mental health history once it is public.

Legal Protections: In the real world, this data is often protected by laws like HIPAA (in the US) because it counts as Protected Health Information (PHI).

2. What are the ethical risks of using AI wellness apps?

Hallucination: AI might give dangerous or incorrect advice (e.g., telling someone in a crisis to "just sleep it off").

Bias: AI models are trained on specific datasets; if the data isn't diverse, the "AI Advisor" might give culturally insensitive or irrelevant advice.

No Human Oversight: An AI cannot feel empathy or detect the nuance of a real human emergency the way a licensed therapist can.

3. How did we protect user data in this lab?

Environment Variables: Instead of putting our database password directly in the code (which would be visible to everyone on GitHub), we used process.env.MYSQL_URL.

Cloud Secrets: We stored the actual connection string in the Render Environment and Railway Variables tabs, ensuring only the server knows how to access the data.

4. How can we improve this for a real production app?

Encryption at Rest: We should encrypt the database so that even if someone steals the file, they can't read the names or moods.

User Authentication: We should add a Login system (using JWT or Auth0) so that only the person who wrote the mood can see it.

Anonymization: We could separate names from mood text in the database, so "Name A" and "Mood B" aren't easily linked if a breach occurs.