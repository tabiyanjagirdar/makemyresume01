// src/pages/PrivacyPolicy.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-10 prose prose-gray">
            <h1>Privacy Policy</h1>
            <p>
                <em>Last updated: {new Date().toLocaleDateString()}</em>
            </p>

            <p>
                This Privacy Policy describes how <strong>makemyresume.help</strong> (“we”, “us”, or “our”)
                collects, uses, and shares information when you visit or use our website:{" "}
                <a href="https://makemyresume.help" target="_blank" rel="noreferrer">
                    https://makemyresume.help
                </a>.
            </p>

            <h2>Who we are</h2>
            <p>
                Website:{" "}
                <a href="https://makemyresume.help" target="_blank" rel="noreferrer">
                    makemyresume.help
                </a>
                <br />
                Contact:{" "}
                <a href="mailto:studybrokud@gmail.com">studybrokud@gmail.com</a>
            </p>

            <h2>Information we collect</h2>
            <ul>
                <li>
                    <strong>Usage data:</strong> IP address, browser type, device info, pages visited, and
                    timestamps.
                </li>
                <li>
                    <strong>Content & forms you submit:</strong> e.g., job applications or contact messages.
                </li>
                <li>
                    <strong>Cookies & similar technologies:</strong> used to keep the site functional, analyze
                    usage, and display ads.
                </li>
            </ul>

            <h2>How we use information</h2>
            <ul>
                <li>Operate, maintain, and improve the website.</li>
                <li>Provide and personalize content (e.g., courses, jobs).</li>
                <li>Measure performance and deliver advertising.</li>
                <li>Communicate with you and respond to inquiries.</li>
                <li>Maintain security and comply with legal obligations.</li>
            </ul>

            <h2>Cookies & Advertising</h2>
            <p>
                We use cookies and similar technologies to operate our site and to help deliver, measure,
                and personalize ads. You can control cookies through your browser settings. Disabling some
                cookies may affect site functionality.
            </p>

            <h3>Ezoic</h3>
            <p>
                We use <strong>Ezoic</strong> to provide advertising and related services on this site.
                Ezoic may use cookies and collect certain data (such as IP address, device and browser info,
                ad interactions) to serve personalized or non-personalized ads and to measure performance.
            </p>
            <p>
                Ezoic’s required disclosures and partner list can be found here:{" "}
                <a
                    href="http://g.ezoic.net/privacy/makemyresume.help"
                    target="_blank"
                    rel="noreferrer"
                >
                    http://g.ezoic.net/privacy/makemyresume.help
                </a>
            </p>
            <span id="ezoic-privacy-policy-embed"></span>

            <h2>Your choices</h2>
            <ul>
                <li>
                    <strong>Cookie controls:</strong> Manage cookies in your browser settings. If you use an
                    ad-blocking or privacy extension, it may also provide additional controls.
                </li>
                <li>
                    <strong>Interest-based advertising opt-outs:</strong>
                    <br />
                    NAI:{" "}
                    <a
                        href="https://optout.networkadvertising.org/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        optout.networkadvertising.org
                    </a>
                    <br />
                    YourAdChoices:{" "}
                    <a href="https://youradchoices.com/" target="_blank" rel="noreferrer">
                        youradchoices.com
                    </a>
                    <br />
                    Your Online Choices (EU):{" "}
                    <a
                        href="https://www.youronlinechoices.eu/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        youronlinechoices.eu
                    </a>
                </li>
            </ul>

            <h2>Data retention</h2>
            <p>
                We retain information only as long as necessary for the purposes described in this policy,
                unless a longer retention period is required or permitted by law.
            </p>

            <h2>Children’s privacy</h2>
            <p>
                Our site is not directed to children under the age of 13 (or 16 where applicable). We do not
                knowingly collect personal information from children.
            </p>

            <h2>International transfers</h2>
            <p>
                Your information may be processed in countries other than your own. We take steps to ensure
                appropriate safeguards are in place.
            </p>

            <h2>Your rights</h2>
            <p>
                Depending on your location, you may have rights to access, correct, delete, or restrict the
                use of your personal information. To exercise these rights, contact us at{" "}
                <a href="mailto:studybrokud@gmail.com">studybrokud@gmail.com</a>.
            </p>

            <h2>Changes to this policy</h2>
            <p>
                We may update this Privacy Policy from time to time. We will post any changes on this page
                with a new “Last updated” date.
            </p>

            <h2>Contact us</h2>
            <p>
                If you have questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:studybrokud@gmail.com">studybrokud@gmail.com</a>.
            </p>

            <a className="text-sm text-gray-600 hover:underline" href="/">
                <Link to="/">← Back to Home</Link>
            </a>
        </div>
    );
}
