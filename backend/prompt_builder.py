def build_prompt(topic, platform, tone, content_type, length):

    length_map = {
        "Short": "50-80 words",
        "Medium": "120-180 words",
        "Long": "200-300 words"
    }

    platform_rules = {
        "LinkedIn": "Professional tone. Avoid excessive emojis.",
        "Instagram": "Engaging, creative, emojis allowed.",
        "Twitter": "Concise and impactful. Keep it short."
    }

    prompt = f"""
You are a professional social media copywriter.

Generate content using these details:

Topic: {topic}
Platform: {platform}
Tone: {tone}
Content Type: {content_type}
Length: {length_map.get(length)}

Platform Guidelines:
{platform_rules.get(platform)}

Structure output strictly as:

Main Post:
<post>

Caption:
<short caption>

Hashtags:
<8 relevant hashtags>

Ensure platform appropriate formatting.
"""

    return prompt