window.initQuiz = async function (postId) {
    const box = document.getElementById('quizContainer');
    if (!box) return;

    const all = await (await fetch('data/quizzes.json')).json();
    const qset = all[postId] || [];


    box.innerHTML = '';
    qset.forEach((q, idx) => {
        const wrap = document.createElement('div');
        wrap.className = 'q';
        wrap.innerHTML = `<p><strong>Q${idx + 1}.</strong> ${q.q}</p>`;

        const ul = document.createElement('ul');
        ul.className = 'choices';

        q.choices.forEach((c, i) => {
            const id = `q${idx}_${i}`;
            const li = document.createElement('li');
            li.innerHTML = `
                <label for="${id}">
                  <input type="radio" name="q${idx}" id="${id}" value="${i}">
                  ${c}
                </label>`;
            ul.appendChild(li);
        });

        wrap.appendChild(ul);
        box.appendChild(wrap);
    });

    const feedback = document.getElementById('quizFeedback');
    const submitBtn = document.getElementById('submitQuiz');
    const resetBtn = document.getElementById('resetQuiz');


    submitBtn.onclick = () => {
        let score = 0;
        qset.forEach((q, idx) => {
            const chosen = box.querySelector(`input[name="q${idx}"]:checked`);
            if (chosen && Number(chosen.value) === q.answer) score++;
        });

        const msg = `You scored ${score}/${qset.length}. ` +
            (score === qset.length
                ? "Perfect! 🛫"
                : score >= Math.ceil(qset.length / 2)
                    ? "Nice flight!"
                    : "Let's taxi back and review.");

        feedback.textContent = msg;
        feedback.style.color = score === qset.length ? "green" : (score ? "orange" : "red");


        localStorage.setItem(`quizScore_${postId}`, score);
    };


    resetBtn.onclick = () => {
        box.querySelectorAll('input[type="radio"]').forEach(i => i.checked = false);
        feedback.textContent = '';
    };
};

document.addEventListener("DOMContentLoaded", () => {

    const quizzes = {
        "1": {
            q: "✈ What was the primary cause of the Tenerife Airport Disaster in 1977?",
            choices: [
                "Mechanical failure of the KLM aircraft",
                "Miscommunication and misunderstanding of takeoff clearance",
                "Poor maintenance of the runway"
            ],
            answer: "b"
        },
        "2": {
            q: "✈ Why don’t pilots consider turbulence a major safety risk?",
            choices: [
                "Pilots can avoid all turbulence",
                "Planes are designed to flex and pilots manage it",
                "It only occurs during takeoff"
            ],
            answer: "b"
        },
        "3": {
            q: "✈ What is one of the first tasks airline pilots perform during pre-flight preparations?",
            choices: [
                "Conducting a walk-around inspection of the aircraft",
                "Reviewing weather reports, flight plans, and maintenance logs",
                "Communicating with air traffic control for takeoff clearance"
            ],
            answer: "b"
        },
        "4": {
            q: "✈ What is one major advantage of electric aircraft compared to traditional aircraft?",
            choices: [
                "They produce zero direct CO₂ emissions during operation",
                "They can fly longer nonstop routes than jet aircraft",
                "They require no pilot training or pre-flight preparation"
            ],
            answer: "a"
        },
        "5": {
            q: "✈ Why do ultra-long-haul flights often have up to four pilots onboard?",
            choices: [
                "To reduce fuel consumption during flight",
                "To provide in-flight entertainment for passengers",
                "To allow for strategic rotations and rest periods"
            ],
            answer: "c"
        }
    };


    const params = new URLSearchParams(window.location.search);
    const postId = params.get("id");
    const quiz = quizzes[postId];
    if (!quiz) return;

    const container = document.getElementById("quizContainer");
    const feedback = document.querySelector(".quiz-feedback");
    const submitBtn = document.querySelector(".quiz-submit");
    const resetBtn = document.querySelector(".quiz-reset");


    let html = `<div class="q"><p>${quiz.q}</p><ul class="choices">`;
    ["a", "b", "c"].forEach((letter, i) => {
        html += `<li><label><input type="radio" name="q" value="${letter}"> ${quiz.choices[i]}</label></li>`;
    });
    html += "</ul></div>";
    container.innerHTML = html;


    submitBtn.addEventListener("click", () => {
        const chosen = container.querySelector("input[name='q']:checked");
        if (!chosen) {
            feedback.textContent = "⚠ Please select an answer!";
            feedback.style.color = "orange";
            return;
        }
        if (chosen.value === quiz.answer) {
            feedback.textContent = "✅ Correct! Well done.";
            feedback.style.color = "green";
        } else {
            feedback.textContent = "❌ Not quite, try again.";
            feedback.style.color = "red";
        }
    });


    resetBtn.addEventListener("click", () => {
        container.querySelectorAll("input[type='radio']").forEach(r => r.checked = false);
        feedback.textContent = "";
    });
});