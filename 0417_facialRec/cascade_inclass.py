import cv2
from matplotlib import pyplot as plt
import os
import numpy as np

def apply_snapchat_filter(img):
    # Load the pre-trained face detection model
    haar_file = os.path.join(os.path.dirname(cv2.__file__), 'data', 'haarcascade_frontalface_default.xml')
    face_cascade = cv2.CascadeClassifier(haar_file)

    # Convert the image to grayscale
    img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Detect faces in the image
    faces = face_cascade.detectMultiScale(img_gray, 1.3, 5)

    # Create a copy of the original image
    img_out = img.copy()

    # Draw a rectangle around each detected face and make it bigger
    for (x, y, w, h) in faces:
        # Calculate the new dimensions of the face region
        new_w = int(w * 1.5)
        new_h = int(h * 1.5)
        new_x = x - int((new_w - w) / 2)
        new_y = y - int((new_h - h) / 2)

        # Ensure that the new coordinates and dimensions are within the image bounds
        new_x = max(new_x, 0)
        new_y = max(new_y, 0)
        new_w = min(new_w, img.shape[1] - new_x)
        new_h = min(new_h, img.shape[0] - new_y)

        # Resize and copy the face region to the output image
        face_resized = cv2.resize(img[y:y+h, x:x+w], (new_w, new_h))
        img_out[new_y:new_y+new_h, new_x:new_x+new_w] = face_resized

    return img_out


def apply_spiral_cheeks_filter(img):
    # Load the pre-trained face detection model
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")

    # Convert the image to grayscale
    img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Detect faces in the image
    faces = face_cascade.detectMultiScale(img_gray, 1.3, 5)

    # Create a copy of the original image
    img_out = img.copy()

    # Define the parameters for the spiral
    radius = 4
    thickness = 1
    color = (0, 255, 0)  # bright red
    num_turns = 4

    # Draw a spiral on each cheek
    for (x, y, w, h) in faces:
        # Calculate the center of the left and right cheeks
        left_cheek_center = (int(x + 0.25 * w), int(y + 0.5 * h + 10))
        right_cheek_center = (int(x + 0.75 * w), int(y + 0.5 * h + 10))

        # Draw a spiral on the left cheek
        for angle in range(0, int(num_turns * 360), 5):
            x = int(left_cheek_center[0] + radius * (1 + angle / 360.0) * np.cos(angle * np.pi / 180))
            y = int(left_cheek_center[1] + radius * (1 + angle / 360.0) * np.sin(angle * np.pi / 180))
            cv2.circle(img_out, (x, y), thickness, color, -1)

        # Draw a spiral on the right cheek
        for angle in range(0, int(num_turns * 360), 5):
            x = int(right_cheek_center[0] + radius * (1 + angle / 360.0) * np.cos(angle * np.pi / 180))
            y = int(right_cheek_center[1] + radius * (1 + angle / 360.0) * np.sin(angle * np.pi / 180))
            cv2.circle(img_out, (x, y), thickness, color, -1)

    return img_out


# Create a VideoCapture object to read from the default camera device
cap = cv2.VideoCapture(0)

# Load the pre-trained face detection model
haar_file = os.path.join(os.path.dirname(cv2.__file__), 'data', 'haarcascade_frontalface_default.xml')
face_cascade = cv2.CascadeClassifier(haar_file)

while True:
    # Read a frame from the camera
    ret, img = cap.read()

    # Convert the image to grayscale
    img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Detect faces in the image
    faces = face_cascade.detectMultiScale(img_gray, 1.3, 5)

    # Draw a rectangle around each detected face
    for (x, y, w, h) in faces:
        cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)

    

    # apply snapchat filter
    #img = apply_snapchat_filter(img)

    # apply spiral cheeks filter
    img = apply_spiral_cheeks_filter(img)

    # Show the image in a window
    cv2.imshow('Face Detection', img)

    # Press 'q' to exit
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the camera and close all windows
cap.release()
cv2.destroyAllWindows()
