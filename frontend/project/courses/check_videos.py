"""
Check YouTube video playability and duration via oEmbed and page scraping.
Uses only standard library + urllib.
"""

import json
import re
import urllib.request
import urllib.parse
import urllib.error

# All unique video IDs grouped by course
video_map = {
    "data_visualization.html": [
        ("M1", "5Zg-C8AAIGg"),
        ("M2", "wB9C0Mz9gSo"),
        ("M3", "Gils_O8Nf5Y"),
        ("M4", "hSInYV9676I"),
        ("M5", "2TR_6VaVp1E"),
        ("M6", "ms29Z_XKsS0"),
        ("M7", "W_Xo5GAtK7o"),
        ("M8", "zXp_vCiz60s"),
    ],
    "numpy.html": [
        ("M1", "8Mpc9ukltVA"),
        ("M2-4,6-8", "QUT1VHiLmmI"),
        ("M5", "R67XuYc9NQ4"),
    ],
    "pandas.html": [
        ("M1,3,4,6,8,9,11,12", "zmdjNSmRXF4"),
        ("M2", "F6kmIpWWEdU"),
        ("M5", "P_q0tkYqvSk"),
        ("M7", "Wb2Tp35dZ-I"),
        ("M10", "tcRGa2soc-c"),
    ],
    "python.html": [
        ("M1,2,12,14-18", "kqtD5dpn9C8"),
        ("M3", "v5MR5JnKcZI"),
        ("M4", "DZwmZ8Usvnk"),
        ("M5", "6iF8Xb7Z3wQ"),
        ("M6", "94UHCEmprCY"),
        ("M7", "KWgYha0clzw"),
        ("M8", "ohCDWZgNIU0"),
        ("M9", "daefaLgNkw0"),
        ("M10", "9Os0o3wzS_I"),
        ("M11", "Uh2ebFW8OYM"),
        ("M13", "ZDa-Z5JzLYM"),
    ],
    "sql.html": [
        ("M1", "HXV3zeQKqGY"),
        ("M2", "7S_tz1z_5bA"),
        ("M3", "9yeOJ0ZMUYw"),
        ("M4", "f77U8a-7_mI"),
        ("M5", "Z98p1T_A8A8"),
        ("M6", "qS-I06G7bZc"),
        ("M7", "t9Xk9_jH-8A"),
        ("M8", "Yf5D_Hu_VI4"),
    ],
    "bi_tools.html": [
        ("M1", "L0pC7zS2Q-U"),
        ("M2", "TmhQCmq7zGk"),
        ("M3", "7Jl-R_FEno8"),
        ("M4", "C0y8a4H8X_8"),
        ("M5", "Z84n5wF9z1A"),
        ("M6", "_pA9K55vM1Y"),
        ("M7", "J7k7_7P_LqM"),
        ("M8", "K9jX7u_v-0g"),
    ],
    "data_fundamentals.html": [
        ("M1", "szX7SjP_Kxs"),
        ("M2", "h8fTInSgPAs"),
        ("M3", "t_mXST0p6dM"),
        ("M4", "J7k7_7P_LqM"),
        ("M5", "L0pC7zS2Q-U"),
        ("M6", "2AFgpQTfVnQ"),
        ("M7", "0_P_9_v_0_8"),
        ("M8", "_V8eKsto3Ug"),
    ],
    "eda.html": [
        ("M1", "2AFgpQTfVnQ"),
        ("M2", "h8fTInSgPAs"),
        ("M3", "Hj6W0O1Xv0g"),
        ("M4", "O102-pU7o6Y"),
        ("M5", "69WpZ0Z0v0Y"),
        ("M6", "3p6-v7u8v0g"),
        ("M7", "mtH1fmNVqcE"),
        ("M8", "4E2Z0-6wNn0"),
    ],
    "excel.html": [
        ("M1", "rwbho0CgEAE"),
        ("M2", "Jl0Qp8Ere-8"),
        ("M3", "S263O-I8o2s"),
        ("M4", "_fL_v7_a6Ew"),
        ("M5", "S_I5O_Yv9Uo"),
        ("M6", "m0wI69n_S8s"),
        ("M7", "9P-Hpe0Yos8"),
        ("M8", "S_k8D6L4r6Y"),
    ],
    "statistics.html": [
        ("M1", "CHp4KAn_uO8"),
        ("M2", "kn83BA7cRNM"),
        ("M3", "O102-pU7o6Y"),
        ("M4", "KzfWUEJjG18"),
        ("M5", "mtH1fmNVqcE"),
        ("M6", "L-9V_G9jV-0"),
        ("M7", "2oJ_v0_8_88"),
        ("M8", "4-Xv8jD-9Gk"),
    ],
}


def parse_duration(iso_str):
    """Convert ISO 8601 duration (e.g. PT18M17S) to total seconds."""
    match = re.match(r'PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?', iso_str)
    if not match:
        return None
    hours = int(match.group(1) or 0)
    mins = int(match.group(2) or 0)
    secs = int(match.group(3) or 0)
    return hours * 3600 + mins * 60 + secs


def seconds_to_mmss(total_secs):
    h = total_secs // 3600
    m = (total_secs % 3600) // 60
    s = total_secs % 60
    if h:
        return f"{h:02d}:{m:02d}:{s:02d}"
    return f"{m:02d}:{s:02d}"


def check_video(vid_id):
    """Check a video using the YouTube oEmbed endpoint + page JSON."""
    url = f"https://www.youtube.com/watch?v={vid_id}"
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept-Language": "en-US,en;q=0.9",
        }
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            html = resp.read().decode('utf-8', errors='replace')
    except Exception as e:
        return {"playable": False, "duration": None, "error": str(e)}

    # Check for unavailable signals
    unavailable_signals = [
        '"playabilityStatus":{"status":"ERROR"',
        '"playabilityStatus":{"status":"UNPLAYABLE"',
        '"playabilityStatus":{"status":"LOGIN_REQUIRED"',
        'This video isn\'t available',
        '"isPrivate":true',
        'video unavailable',
    ]
    is_unavailable = any(s.lower() in html.lower() for s in unavailable_signals)

    # Try to extract duration from lengthSeconds
    duration_secs = None
    m = re.search(r'"lengthSeconds"\s*:\s*"(\d+)"', html)
    if m:
        duration_secs = int(m.group(1))

    if is_unavailable and not duration_secs:
        return {"playable": False, "duration": None, "error": "Video unavailable"}

    return {
        "playable": True,
        "duration": duration_secs,
        "duration_str": seconds_to_mmss(duration_secs) if duration_secs else "Unknown",
        "exceeds_15m": (duration_secs > 900) if duration_secs else None,
    }


results = {}
for course, videos in video_map.items():
    results[course] = []
    seen = set()
    for module, vid_id in videos:
        if vid_id in seen:
            results[course].append({"module": module, "video_id": vid_id, "status": "SAME AS ABOVE"})
            continue
        seen.add(vid_id)
        print(f"  Checking {course} {module}: {vid_id}...", flush=True)
        info = check_video(vid_id)
        results[course].append({
            "module": module,
            "video_id": vid_id,
            **info
        })

# Print results
for course, vids in results.items():
    print(f"\n=== {course} ===")
    for v in vids:
        vid_id = v["video_id"]
        module = v["module"]
        if v.get("status") == "SAME AS ABOVE":
            print(f"  {module}: {vid_id} — same video as above")
            continue
        playable = "YES" if v.get("playable") else "NO"
        dur = v.get("duration_str", "N/A")
        exc = v.get("exceeds_15m")
        exc_str = "YES" if exc else ("NO" if exc is False else "N/A")
        err = v.get("error", "")
        print(f"  {module}: {vid_id} | Playable={playable} | Duration={dur} | >15m={exc_str} {('| ERR: '+err) if err else ''}")
